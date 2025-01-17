/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRouter } from "next/navigation";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaSignOutAlt,
} from "react-icons/fa"; // Import React Icons
import { useUser } from "@/context/UserContext";

type AgoraCallProps = {
  AppId: string;
  ChannelName: string;
  RtcToken: string;
};

const Call: React.FC<AgoraCallProps> = ({ AppId, ChannelName, RtcToken }) => {
  const { user } = useUser();
  const uniquUserId = user?.sub;

  const [isJoined, setIsJoined] = useState(false);
  const [audioTrack, setAudioTrack] = useState<any>(null);
  const [videoTrack, setVideoTrack] = useState<any>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [agoraClient, setAgoraClient] = useState<any>(null);

  const router = useRouter();
  const appId = AppId;
  const channelName = ChannelName;
  const token = RtcToken;
  const uid = uniquUserId;

  useEffect(() => {
    joinChannel();
  }, [RtcToken]); // Trigger join when RTC token is ready

  const joinChannel = async () => {
    if (isJoined) return;

    try {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setAgoraClient(client);

      client.on("user-published", async (user: any, mediaType: any) => {
        await client.subscribe(user, mediaType);
        console.log("Subscribed to user:", user.uid);

        if (mediaType === "video") {
          const remoteVideoContainer = document.getElementById("remote-video");
          user.videoTrack?.play(remoteVideoContainer);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user: any) => {
        console.log("User unpublished:", user.uid);
      });

      // Join the channel
      await client.join(appId, channelName, token, uid);

      // Create and publish local tracks
      const micTrack: any = await AgoraRTC.createMicrophoneAudioTrack();
      const camTrack: any = await AgoraRTC.createCameraVideoTrack();

      await client.publish([micTrack, camTrack]);

      // Play local video
      const localVideoContainer = document.getElementById("local-video");
      camTrack.play(localVideoContainer);

      setAudioTrack(micTrack);
      setVideoTrack(camTrack);
      setIsJoined(true);

      console.log("Joined the channel and published tracks.");
    } catch (error: any) {
      console.error("Failed to join the channel:", error);
    }
  };

  const leaveChannel = async () => {
    if (!isJoined || !agoraClient) return;
    try {
      audioTrack?.stop();
      audioTrack?.close();
      videoTrack?.stop();
      videoTrack?.close();

      await agoraClient.leave();
      setIsJoined(false);
      router.push("/home");

      console.log("Left the channel.");
    } catch (error: any) {
      console.error("Failed to leave the channel:", error);
    }
  };

  const toggleAudio = () => {
    if (audioTrack) {
      audioTrack.setEnabled(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (videoTrack) {
      videoTrack.setEnabled(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <button
          onClick={leaveChannel}
          disabled={!isJoined}
          className="shadow-black w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 flex items-center justify-center transition-transform transform hover:scale-110"
        >
          <FaSignOutAlt size={28} />
        </button>
        <button
          onClick={toggleAudio}
          disabled={!isJoined}
          className="shadow-black w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 flex items-center justify-center mx-4 transition-transform transform hover:scale-110"
        >
          {isAudioEnabled ? (
            <FaMicrophone size={28} />
          ) : (
            <FaMicrophoneSlash size={28} />
          )}
        </button>
        <button
          onClick={toggleVideo}
          disabled={!isJoined}
          className="shadow-black w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 flex items-center justify-center transition-transform transform hover:scale-110"
        >
          {isVideoEnabled ? <FaVideo size={28} /> : <FaVideoSlash size={28} />}
        </button>
      </div>
      <div className="lg:flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 lg:justify-center mt-10">
        <div className="relative">
          {/* Local Video */}
          <div
            id="local-video"
            className="w-[600px] sm:w-[700px] md:w-[800px] lg:w-[900px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-black rounded-lg mx-auto mt-5"
          ></div>
          {/* Local User Label */}
          <div className="absolute top-0 left-0  bg-black w-32 rounded-lg text-white text-center py-1 font-semibold">
            You
          </div>
        </div>
        <div className="relative">
          {/* Remote Video */}
          <div
            id="remote-video"
            className="w-[600px] sm:w-[700px] md:w-[800px] lg:w-[900px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-black rounded-lg mx-auto mt-5 text-white"
          ></div>
          {/* Participant Label */}
          <div className="absolute top-0 left-0 bg-black w-32 rounded-lg text-white text-center py-1 font-semibold">
            Participant
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;

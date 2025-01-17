"use client";

import Call from "@/components/call/Call";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi"; 

export default function Page() {
  const params = useParams();
  const channelName = params?.channelName?.toString() || "";
  const [rtcToken, setRtcToken] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false); 

  const APP_ID = process.env.NEXT_PUBLIC_APP_ID || "";
  const APP_CERTIFICATE = process.env.NEXT_PUBLIC_APP_CERTIFICATE || "";

  useEffect(() => {
    if (channelName) {
      const uid = "0";
      const role = RtcRole.PUBLISHER;
      const expireTime = 3600; 
      const currentTime = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expireTime;

      try {
        const token = RtcTokenBuilder.buildTokenWithAccount(
          APP_ID,
          APP_CERTIFICATE,
          channelName,
          uid,
          role,
          privilegeExpireTime
        );
        setRtcToken(token);
      } catch (error) {
        console.error("Error generating RTC token", error);
      }
    }
  }, [channelName]);

  // Function to copy the channel name to the clipboard
  const handleCopy = () => {
    if (channelName) {
      navigator.clipboard.writeText(channelName);
      setIsCopied(true);

      // Reset the copy state after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (!rtcToken) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex w-full flex-col">
      <div className="flex items-center mt-2 ml-12 text-2xl font-bold text-gray-900 h-10 ">
        <p>{channelName}</p>

        {/* Copy icon button */}
        <button
          onClick={handleCopy}
          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <FiCopy size={24} />
        </button>

        {/* Show copied status */}
        {isCopied && (
          <span className="ml-2 text-sm text-green-500">Copied!</span>
        )}
      </div>

      {/* Pass the RTC token to the Call component */}
      <Call AppId={APP_ID} ChannelName={channelName} RtcToken={rtcToken} />
    </main>
  );
}

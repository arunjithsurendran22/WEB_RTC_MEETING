// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@/context/UserContext";
import Header from "@/layout/header/Header";
import { v4 as uuidv4 } from "uuid"; // To generate random IDs

export default function Home() {
  const router = useRouter();
  const { user } = useUser(); // Access the user data from context

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      channel: { value: string };
    };
    const channelName = target.channel.value;

    if (channelName && user?.sub) {
      // Pass the user.sub as part of the query string
      router.push(`/channel/${channelName}`);
    }
  };

  const startNewMeeting = () => {
    // Generate a random channel name and redirect to it
    const randomChannel = uuidv4(); // Use UUID to generate a random meeting ID
    router.push(`/channel/${randomChannel}`);
  };

  return (
    <>
      <Header />
      <div className="md:flex justify-between items-center mt-20 px-4 md:px-0 md:container mx-auto">
        {/* Main content */}
        <div className=" text-center">
          {user ? (
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
              Welcome, <span className="text-blue-500">{user.name}</span>
            </h1>
          ) : (
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
              Welcome to the platform
            </h1>
          )}

          <p className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-600">
            Video Calls and Meetings for Everyone
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center items-center">
              {/* New Meeting Button */}
              <button
                onClick={startNewMeeting}
                className="inline-flex items-center justify-center w-52 p-1 h-12 text-base font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
              >
                New Meeting
              </button>
              
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 h-12 w-full"
                id="channel"
                type="text"
                name="channel"
                placeholder="Enter meeting ID"
                required
              />
              <button
                className="inline-flex items-center justify-center px-5 h-12 text-base font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                type="submit"
              >
                JOIN
              </button>
            </div>
          </form>
        </div>

        {/* Right image */}
        <div className=" w-full md:w-4/12 ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/015/682/759/non_2x/business-meeting-icon-color-outline-vector.jpg"
            alt="Right Image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

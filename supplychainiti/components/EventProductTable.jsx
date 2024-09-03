import { ethers } from "ethers";
import Link from "next/link";
import React from "react";

export const EventProductTable = ({ events }) => {
  console.log(events, "events");
  return (
    <div>
      {events && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Event name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {event.eventName}
                  </th>
                  <td className="px-6 py-4">
                    {new Date(
                      event.args.timeStamp.toString() * 1000
                    ).toLocaleDateString()}
                    {}
                  </td>
                  <td className="px-6 py-4"> {event.args.currentOwner}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {ethers.formatEther(event.args.price.toString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

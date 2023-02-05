import React, { useState, useEffect, ReactElement } from "react";
import UserData from "../../../data.json";

type NotificationProps = {
  notification: NotificationArray[];
};

type NotificationArray = {
  id: number;
  isRead: boolean;
  time: string;
  user: {
    image: string;
    name: string;
  };
  type: string;
  event: {
    post?: string;
    group?: string;
    picture?: string;
    message?: string;
  };
};

const Notification: React.FC = () => {
  const [userData, setUserData] = useState<NotificationProps>(UserData);

  const totalNotifcations: Number = userData?.notification.length
    ? userData?.notification.filter((item) => item.isRead === false).length
    : 0;

  const handleOnClick = () => {
    const newObj: any = userData?.notification.map((item) => {
      return item.isRead === false ? { ...item, isRead: true } : item;
    });
    setUserData({ ...userData, notification: newObj });
  };
  return (
    <div className=" bg-white rounded-lg px-4 max-w-3xl shadow-lg">
      <div className=" flex justify-between items-center py-8">
        <p className=" font-bold text-veryDarkBlue text-lg">
          Notifications
          <span className=" ml-2 text-white bg-blue px-2 py-1 rounded-md">
            {totalNotifcations?.toString()}
          </span>
        </p>
        <button
          className=" text-darkGrayishBlue hover:text-blue"
          onClick={handleOnClick}
        >
          Mark all as read
        </button>
      </div>
      <div className=" flex flex-col gap-4">
        {userData?.notification.map(
          (notificationItem: NotificationArray): ReactElement => (
            <NotificationItem
              key={notificationItem.id}
              data={notificationItem}
            />
          )
        )}
      </div>
    </div>
  );
};

type NotificationItemProps = {
  data: NotificationArray;
};
const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {
  return (
    <div
      className={`${
        data.isRead === false ? "bg-veryLightGrayishBlue" : ""
      } p-4 flex gap-4`}
    >
      <img
        className=" self-start w-14"
        src={getImageUrl(data.user.image)}
        alt="Profile Image"
      />
      <div className=" w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className=" space-x-1">
              <a
                href="#"
                className=" text-veryDarkBlue hover:text-blue font-bold"
              >
                {data.user.name}
              </a>
              <span className=" text-darkGrayishBlue">{data.type}</span>
              {data.event.post && (
                <a
                  href="#"
                  className=" text-darkGrayishBlue hover:text-blue font-bold"
                >
                  {data.event.post}
                </a>
              )}
              {data.event.group && (
                <a href="#" className=" text-blue font-bold">
                  {data.event.group}
                </a>
              )}
              {data.isRead === false ? (
                <span className=" bg-red rounded-full inline-block w-2 h-2"></span>
              ) : (
                ""
              )}
            </p>
            <p className=" text-grayishBlue">{data.time}</p>
          </div>
          {data.event.picture && (
            <img
              className=" h-14 aspect-auto cursor-pointer"
              src={getImageUrl(data.event.picture)}
              alt=""
            />
          )}
        </div>
        {data.event.message && (
          <p className=" text-darkGrayishBlue mt-4 hover:bg-lightGrayishBlue2 cursor-pointer p-4 border-2 border-lightGrayishBlue2 rounded-md">
            {data.event.message}
          </p>
        )}
      </div>
    </div>
  );
};

function getImageUrl(name: string) {
  return new URL(`../../assets/images/${name}`, import.meta.url).href;
}

export default Notification;

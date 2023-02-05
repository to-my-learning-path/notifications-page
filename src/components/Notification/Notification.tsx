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
    <div>
      <div>
        <p>
          Notifications<span>{totalNotifcations?.toString()}</span>
        </p>
        <button onClick={handleOnClick}>Mark all as read</button>
      </div>
      <div>
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
    <div>
      <div>
        {/* <img src={require(`../../assets/images/${data.user.image}`)} alt="" /> */}
        <img src={getImageUrl(data.user.image)} alt="Profile Image" />
        <div>
          <p>{data.user.name}</p>
          <p>{data.type}</p>
          {data.event.post && <p>{data.event.post}</p>}
          {data.event.group && <p>{data.event.group}</p>}
        </div>
        {data.event.picture && (
          <img src={getImageUrl(data.event.picture)} alt="" />
        )}
      </div>
      <div>{data.event.message && <p>{data.event.message}</p>}</div>
    </div>
  );
};

function getImageUrl(name: string) {
  return new URL(`../../assets/images/${name}`, import.meta.url).href;
}

export default Notification;

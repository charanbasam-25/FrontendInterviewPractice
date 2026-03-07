import { useEffect, useState } from "react";

const dummyComments = {
  streamId: "abc123",
  nextCursor: "cursor_1709123456",
  hasMore: true,
  totalCount: 1248,
  comments: [
    {
      id: "cmt_1001",
      message: "This feature looks amazing 🔥",
      createdAt: "2026-02-27T10:01:22Z",
      edited: false,
      isPinned: true,
      likeCount: 42,
      replyCount: 2,
      author: {
        id: "user_201",
        name: "Rahul Sharma",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        badge: "subscriber",
        isVerified: false,
      },
      reactions: {
        like: 30,
        love: 10,
        fire: 2,
      },
      replies: [
        {
          id: "cmt_1001_r1",
          message: "Totally agree!",
          createdAt: "2026-02-27T10:02:01Z",
          author: {
            id: "user_202",
            name: "Ananya Singh",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
            badge: "moderator",
          },
        },
        {
          id: "cmt_1001_r2",
          message: "When will it be released?",
          createdAt: "2026-02-27T10:03:45Z",
          author: {
            id: "user_203",
            name: "Dev Patel",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            badge: null,
          },
        },
      ],
    },
    {
      id: "cmt_1002",
      message: "Can you explain the architecture part again?",
      createdAt: "2026-02-27T10:05:10Z",
      edited: false,
      isPinned: false,
      likeCount: 8,
      replyCount: 0,
      author: {
        id: "user_204",
        name: "Priya Verma",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        badge: null,
        isVerified: true,
      },
      reactions: {
        like: 6,
        confused: 2,
      },
      replies: [],
    },
    {
      id: "cmt_1003",
      message: "UI looks clean 👌",
      createdAt: "2026-02-27T10:06:45Z",
      edited: true,
      isPinned: false,
      likeCount: 15,
      replyCount: 1,
      author: {
        id: "user_205",
        name: "Suresh Kumar",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        badge: "host",
        isVerified: true,
      },
      reactions: {
        like: 10,
        clap: 5,
      },
      replies: [
        {
          id: "cmt_1003_r1",
          message: "Thanks! We worked hard on it.",
          createdAt: "2026-02-27T10:07:30Z",
          author: {
            id: "user_205",
            name: "Suresh Kumar",
            avatar: "https://randomuser.me/api/portraits/men/65.jpg",
            badge: "host",
          },
        },
      ],
    },
  ],
};
const randomNames = [
  "Rahul Sharma",
  "Ananya Singh",
  "Kiran Rao",
  "Dev Patel",
  "Priya Verma",
  "Suresh Kumar",
  "Neha Reddy",
  "Arjun Mehta",
  "Sneha Iyer",
  "Rohan Das",
  "Meera Nair",
  "Amit Joshi",
  "Pooja Kapoor",
  "Vikram Malhotra",
  "Nikhil Jain",
  "Isha Gupta",
  "Varun Khanna",
  "Tanvi Deshmukh",
  "Aditya Rao",
  "Simran Kaur",
];

function getRandomNames() {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

const CHAT_LIMIT=10;

function LiveComments() {
  const [messages, setMessages] = useState([]);

  function fetchData() {
    console.log("data-------")
    const data = [
      {
        name: getRandomNames(),
        id: "cmt_1002",
        message: "Can you explain the architecture part again?",
      },
    ];

    setMessages((prev) => {
      const newMessages = [...prev, ...data];
      return newMessages.slice(-CHAT_LIMIT);
    });
  }

  useEffect(() => {
    const id = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="live-comments-container">
      {messages &&
        messages?.map((eachCommnet, index) => {
          return (
            <div key={eachCommnet.id} className="each-comment">
              <p>{eachCommnet?.name}</p>
              <p style={{paddingLeft:"20px"}}>{eachCommnet.message}</p>
            </div>
          );
        })}
    </div>
  );
}

export default LiveComments;

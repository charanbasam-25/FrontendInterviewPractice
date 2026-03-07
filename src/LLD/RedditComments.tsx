import { useState, useEffect, useRef } from "react";

const comments = [
  {
    id: "c1",
    author: "frontend_guru",
    avatar: "https://i.pravatar.cc/40?img=1",
    content: "This is actually a great explanation of reflow vs repaint!",
    score: 128,
    createdAt: "2026-02-19T08:30:00Z",
    edited: false,
    replies: [
      {
        id: "c1_1",
        author: "css_master",
        avatar: "https://i.pravatar.cc/40?img=2",
        content: "Totally agree. Especially the layout thrashing part.",
        score: 42,
        createdAt: "2026-02-19T09:00:00Z",
        edited: false,
        replies: [],
      },
      {
        id: "c1_2",
        author: "react_dev",
        avatar: "https://i.pravatar.cc/40?img=3",
        content: "React’s batching really helps reduce reflows.",
        score: 35,
        createdAt: "2026-02-19T09:15:00Z",
        edited: true,
        replies: [
          {
            id: "c1_2_1",
            author: "perf_engineer",
            avatar: "https://i.pravatar.cc/40?img=4",
            content:
              "Yes! But you still need to avoid forced synchronous layouts.",
            score: 18,
            createdAt: "2026-02-19T09:30:00Z",
            edited: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    author: "js_noob",
    avatar: "https://i.pravatar.cc/40?img=5",
    content: "Can someone explain containing blocks again? 😅",
    score: 64,
    createdAt: "2026-02-19T10:00:00Z",
    edited: false,
    replies: [
      {
        id: "c2_1",
        author: "layout_expert",
        avatar: "https://i.pravatar.cc/40?img=6",
        content: "Nearest positioned ancestor (position ≠ static).",
        score: 90,
        createdAt: "2026-02-19T10:10:00Z",
        edited: false,
        replies: [],
      },
    ],
  },
];

function CommentBox({ data }) {
  return (
    <div>
      {data &&
        data.map((eachComm, index) => (
          <div
            className="comment-wrapper"
            style={{ borderLeft: "2px solid #fff" }}
          >
            <div className="each-comment" key={index}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <img
                  className="prof-pic"
                  src={eachComm.avatar}
                  height="50px"
                  width="50px"
                  style={{ borderRadius: "50%" }}
                />
                <span className="author">{eachComm.author}</span>
              </div>

              <p className="comment" style={{ paddingLeft: "16px" }}>
                {eachComm.content}
              </p>
            </div>
            {eachComm && eachComm.replies && (
              <div className="replies" style={{ paddingLeft: "20px" }}>
                <CommentBox data={eachComm.replies} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

function ReddictComments() {
  return (
    <div className="reddit-comments">
      <CommentBox data={comments} />
    </div>
  );
}

export default ReddictComments;

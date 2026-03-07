import { useState, useEffect } from "react";

export const carouselData = [
  {
    id: 1,
    title: "Mountain Adventure",
    description: "Experience the beauty of nature.",
    imageUrl: "https://picsum.photos/id/1018/1000/600/",
    link: "/mountain",
  },
  {
    id: 2,
    title: "Beach Paradise",
    description: "Relax by the sunny beaches.",
    imageUrl: "https://picsum.photos/id/1015/1000/600/",
    link: "/beach",
  },
  {
    id: 3,
    title: "City Lights",
    description: "Explore the vibrant city life.",
    imageUrl: "https://picsum.photos/id/1019/1000/600/",
    link: "/city",
  },
  {
    id: 4,
    title: "Forest Escape",
    description: "Find peace in the green woods.",
    imageUrl: "https://picsum.photos/id/1020/1000/600/",
    link: "/forest",
  },
];

function ImageSlider() {
  const [active, setActive] = useState(0);

  function handleNext() {
    setActive((prev) => (prev + 1) % carouselData.length);
  }

  function handlePrev() {
    setActive((prev) => (prev - 1 < 0 ? carouselData.length - 1 : prev - 1));
  }

  useEffect(() => {
    const id = setTimeout(() => {
      handleNext();
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  },[active]);

  return (
    <div className="image-slider">
      <button className="prev-button" onClick={handlePrev}>
        prev
      </button>
      <img src={carouselData[active].imageUrl} width="300px" />
      <button className="next-button" onClick={handleNext}>
        next
      </button>
    </div>
  );
}

export default ImageSlider;

import axios from "axios";
import { useState, useEffect } from "react";

export default function EmblaCarouselWork(index) {
  const [work, setWork] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/works`)
      .then((res) => setWork(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return work[index % work.length];
}

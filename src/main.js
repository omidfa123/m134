import videojs from "video.js";
import qualityLevels from "videojs-contrib-quality-levels";
import "./style.css";
import "/home/omidfa/Work/shorts/node_modules/video.js/dist/video-js.min.css";
import {
  createIcons,
  Fullscreen,
  MessageSquareMore,
  MoreHorizontal,
  Share,
  ThumbsDown,
  ThumbsUp,
} from "lucide";

console.log(ThumbsUp);
// CONFIG
const BASE_URL = "http://localhost:3000";

// SELECTION
const shortsContainer = document.getElementById("shorts-container");
// API CALL

function render(shorts) {
  let videoId;
  shorts.map((short) => {
    videoId = `video-${short.id}`;
    shortsContainer.innerHTML += `<div class="h-full flex justify-between gap-4 snap-item flex-shrink-0">
            <video
            id=${videoId}
            class="video-js vjs-default-skin"
            width="400"
            height="300"
            preload="auto"
            data-setup="{}"
            controls
          >
            <source src=${
              BASE_URL + short.hlsUrl
            }  type="application/x-mpegURL" />
            </p>
          </video>
            <div class="flex flex-col gap-8 self-end">
              <div
                class="bg-gray-200 rounded-full size-12 flex items-center justify-center"
              >
                <i data-lucide="thumbs-up"></i>
              </div>
              <div
                class="bg-gray-200 rounded-full size-12 flex items-center justify-center"
              >
                <i data-lucide="thumbs-down"></i>
              </div>
              <div
                class="bg-gray-200 rounded-full size-12 flex items-center justify-center"
              >
                <i data-lucide="message-square-more"></i>
              </div>
              <div
                class="bg-gray-200 rounded-full size-12 flex items-center justify-center"
              >
                <i data-lucide="share"></i>
              </div>
              <div
                class="bg-gray-200 rounded-full size-12 flex items-center justify-center"
              >
                <i data-lucide="more-horizontal"></i>
              </div>
            </div>
          </div>`;
  });

  shortsContainer.querySelectorAll("video").forEach((videoEl) => {
    videojs(
      videoEl,
      {
        responsive: true,
        fluid: true,
      },
      function () {
        videojs.log("Your player is ready!");
      }
    );
  });
  createIcons({
    icons: {
      ThumbsUp,
      ThumbsDown,
      MessageSquareMore,
      Share,
      MoreHorizontal,
    },
  });
}

const getShorts = async () => {
  const url = BASE_URL + "/api/shorts";

  const res = await fetch(url);
  const result = await res.json();

  console.log(result);
  render(result.shorts);
};

getShorts();

// console.log(todoContainer);

// fetch("https://jsonplaceholder.typicode.com/todos", {
//   method: "GET",
// })
//   .then((res) => res.json())
//   .then((result) => {
//     todoContainer.innerHTML = "";
//     result.map((item) => {
//       todoContainer.innerHTML += item.title;
//     });
//   });

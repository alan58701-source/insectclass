
import React, { useState, useEffect } from 'react';
import { VideoData } from '../types';
import Quiz from './Quiz';

interface VideoDetailProps {
  video: VideoData;
  onBack: () => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ video, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const buildEmbedUrl = () => {
    const baseUrl = `https://www.youtube.com/embed/${video.videoId}`;
    
    // 建立參數物件
    const params: Record<string, string> = {
      autoplay: '1',
      mute: '1',
      start: video.startTime.toString(),
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      // 如果你沒有要用 JS 控制影片播放進度，建議先關閉 enablejsapi
      // enablejsapi: '1', 
    };

    // 只有當 origin 存在且不是 null 時才加入
    if (origin && origin !== 'null') {
      params.origin = origin;
    }

    const queryString = new URLSearchParams(params).toString();
    
    // 💡 修正點：移除 video.si 的判斷，避免追蹤碼干擾
    return `${baseUrl}?${queryString}`;
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 返回按鈕 */}
      <button 
        onClick={onBack}
        className="flex items-center text-green-700 font-medium hover:text-green-800 transition-colors mb-6 group"
      >
        <svg className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        回到列表
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左側：影片播放區域 */}
        <div className="lg:col-span-7 sticky top-8">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black relative group/player border-4 border-white">
            {!isPlaying ? (
              /* 初始預覽圖 */
              <div 
                className="w-full h-full cursor-pointer relative"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover/player:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover/player:scale-110 transition-all duration-300">
                    <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  點擊影片以開始播放
                </div>
              </div>
            ) : (
              /* 完全符合使用者提供規格的 iframe */
              <iframe
                className="w-full h-full"
                src={buildEmbedUrl()}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // 💡 修正點：將嚴格政策改為更相容的模式，或直接刪除此行
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-6 tracking-tight">{video.title}</h1>
          
          <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-amber-900">播放遇到困難嗎？</h3>
                <p className="text-amber-800 text-sm mt-1 leading-relaxed">
                  由於 YouTube 的安全性限制，部分環境可能會顯示「錯誤 153」。
                  若無法直接播放，請點擊下方按鈕前往官網觀看後再回來進行測驗。
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.videoId}&t=${video.startTime}s`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    在 YouTube 開啟 (從 {video.startTime}秒 開始)
                  </a>
                  <button 
                    onClick={() => { setIsPlaying(false); setTimeout(() => setIsPlaying(true), 100); }}
                    className="inline-flex items-center px-5 py-2.5 bg-white border border-amber-300 text-amber-800 text-sm font-bold rounded-xl hover:bg-amber-100 transition-all"
                  >
                    重新嘗試載入
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：知識說明與問答 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              知識補給站
            </h2>
            <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
              <p className="text-gray-800 leading-relaxed text-lg italic">
                {video.description}
              </p>
            </div>
          </div>

          <Quiz questions={video.questions} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;

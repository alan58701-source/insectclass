
import React from 'react';
import { VIDEOS } from '../constants';
import { VideoData } from '../types';

interface VideoListProps {
  onSelect: (video: VideoData) => void;
}

const VideoList: React.FC<VideoListProps> = ({ onSelect }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          自然觀察教室：昆蟲世界
        </h1>
        <p className="text-lg text-green-700 max-w-2xl mx-auto">
          點擊下方縮圖開始你的自然觀察之旅，學習昆蟲的神奇構造與行為！
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {VIDEOS.map((video) => (
          <div 
            key={video.id}
            onClick={() => onSelect(video)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50"
          >
            <div className="relative aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-xl">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.516 7.548c0-.447.332-.781.766-.781.186 0 .366.066.504.188l5.612 4.926 5.612-4.926c.138-.122.318-.188.504-.188.434 0 .766.334.766.781 0 .196-.07.384-.2.531l-6.18 5.417c-.2.175-.47.273-.744.273s-.544-.098-.744-.273l-6.18-5.417a.78.78 0 01-.2-.531z" transform="rotate(-90 10 10)"/>
                    <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2h10v10H5V5z" fillRule="evenodd" clipRule="evenodd" />
                    <path d="M8 7.5l5 2.5-5 2.5v-5z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                {video.title}
              </h2>
              <div className="mt-4 flex items-center text-green-600 font-medium">
                查看詳情並開始測驗
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;

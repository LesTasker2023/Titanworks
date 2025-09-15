'use client';

import { Button } from '@/components/ui/Button';
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  className?: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
}

export function VideoPlayer({
  src,
  title,
  poster,
  className = '',
  onTimeUpdate,
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-hide controls
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      setShowControls(true);
      if (isPlaying) {
        timeoutId = setTimeout(() => setShowControls(false), 3000);
      }
    };

    resetTimer();
    return () => clearTimeout(timeoutId);
  }, [isPlaying]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      setCurrentTime(current);
      onTimeUpdate?.(current, video.duration);

      // Update buffered
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [onTimeUpdate, onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      className={`video-player ${className}`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="video-player__video"
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="video-player__loading">
          <div className="video-player__spinner" />
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="video-player__play-overlay">
          <Button size="lg" onClick={togglePlay} className="video-player__play-button">
            <Play />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`video-player__controls ${showControls ? '' : 'video-player__controls--hidden'}`}
      >
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="video-player__progress-container"
          onClick={handleProgressClick}
        >
          {/* Buffered Progress */}
          <div
            className="video-player__progress-buffered"
            style={{ width: `${bufferedPercentage}%` }}
          />
          {/* Current Progress */}
          <div
            className="video-player__progress-current"
            style={{ width: `${progressPercentage}%` }}
          />
          {/* Progress Handle */}
          <div
            className="video-player__progress-handle"
            style={{ left: `${progressPercentage}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="video-player__controls-row">
          <div className="video-player__controls-left">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="video-player__control-button video-player__control-button--play"
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>

            {/* Skip Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => skip(-10)}
              className="video-player__control-button video-player__control-button--small"
            >
              <RotateCcw />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => skip(10)}
              className="video-player__control-button video-player__control-button--small"
            >
              <RotateCw />
            </Button>

            {/* Volume */}
            <div className="video-player__volume-container">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="video-player__control-button video-player__control-button--small"
              >
                {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
              </Button>

              <div className="video-player__volume-slider">
                <div
                  className="video-player__volume-level"
                  style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={e => handleVolumeChange(Number(e.target.value))}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Time Display */}
            <span className="video-player__time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="video-player__controls-right">
            {/* Playback Speed */}
            <select
              value={playbackRate}
              onChange={e => changePlaybackRate(Number(e.target.value))}
              className="video-player__control-button"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '0.875rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--radius)',
                padding: '0.25rem 0.5rem',
              }}
            >
              <option value={0.5} style={{ backgroundColor: 'black' }}>
                0.5x
              </option>
              <option value={0.75} style={{ backgroundColor: 'black' }}>
                0.75x
              </option>
              <option value={1} style={{ backgroundColor: 'black' }}>
                Normal
              </option>
              <option value={1.25} style={{ backgroundColor: 'black' }}>
                1.25x
              </option>
              <option value={1.5} style={{ backgroundColor: 'black' }}>
                1.5x
              </option>
              <option value={2} style={{ backgroundColor: 'black' }}>
                2x
              </option>
            </select>

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              className="video-player__control-button video-player__control-button--small"
            >
              <Settings />
            </Button>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="video-player__control-button video-player__control-button--small"
            >
              {isFullscreen ? <Minimize /> : <Maximize />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

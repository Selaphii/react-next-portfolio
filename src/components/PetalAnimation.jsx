import React, { useEffect, useState } from 'react';
import './PetalAnimation.css';

const PetalAnimation = () => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const generateSparks = () => {
      const newSpark = {
        id: Date.now(),
        left: Math.random() * 100, // 横位置
        top: Math.random() * 100,  // 縦位置
        size: Math.random() * 10 + 5, // 火花のサイズ
        duration: Math.random() * 2 + 1, // 火花のアニメーション時間
      };

      setSparks((prevSparks) => [...prevSparks, newSpark]);

      // 一定時間後に火花を削除
      setTimeout(() => {
        setSparks((prevSparks) => prevSparks.filter((spark) => spark.id !== newSpark.id));
      }, 2000);
    };

    const sparkInterval = setInterval(generateSparks, 200); // 200msごとに火花を生成

    return () => clearInterval(sparkInterval); // クリーンアップ
  }, []);

  return (
    <div className="petal-container">
      <div className="background"></div> {/* 背景画像 */}
      <div className="fog"></div> {/* 黒い霧のアニメーション */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="spark"
          style={{
            left: `${spark.left}vw`,
            top: `${spark.top}vh`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            animationDuration: `${spark.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default PetalAnimation;

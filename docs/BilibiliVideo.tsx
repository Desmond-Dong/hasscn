export default function BilibiliVideo({ bvid, title, description }: { bvid: string; title?: string; description?: string }) {
  return (
    <div style={{ margin: '20px 0' }}>
      {title && <h4 style={{ marginBottom: '10px' }}>{title}</h4>}
      {description && <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{description}</p>}
      <iframe
        src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
        scrolling="no"
        border="0"
        frameBorder="no"
        frameSpacing="0"
        allowFullScreen={true}
        style={{
          width: '100%',
          height: '500px',
          maxWidth: '800px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
}

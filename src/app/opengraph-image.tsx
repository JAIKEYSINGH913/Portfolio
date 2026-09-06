import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jaikey Singh — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080604',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 120px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(200,90,42,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(200,90,42,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Accent Bar */}
        <div style={{ display: 'flex', width: '120px', height: '8px', background: '#C85A2A', marginBottom: '40px' }} />

        <div
          style={{
            fontSize: '110px',
            fontWeight: 800,
            color: '#E6E6E4',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          JAIKEY SINGH
        </div>

        <div
          style={{
            fontSize: '48px',
            fontWeight: 600,
            color: '#C85A2A',
            letterSpacing: '0.05em',
            display: 'flex',
            marginBottom: '60px',
          }}
        >
          Software Engineer
        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            color: '#8A8A8A',
            fontSize: '28px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          <span style={{ display: 'flex' }}>React</span>
          <span style={{ display: 'flex', color: '#C85A2A' }}>•</span>
          <span style={{ display: 'flex' }}>Next.js</span>
          <span style={{ display: 'flex', color: '#C85A2A' }}>•</span>
          <span style={{ display: 'flex' }}>Cloud</span>
          <span style={{ display: 'flex', color: '#C85A2A' }}>•</span>
          <span style={{ display: 'flex' }}>Architecture</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


"use client";

interface AdProps {
  type: "horizontal" | "vertical";
  className?: string;
}

export default function AdBanner({ type, className = "" }: AdProps) {
  const isHorizontal = type === "horizontal";
  const width = isHorizontal ? 728 : 160;
  const height = isHorizontal ? 90 : 300;
  const key = isHorizontal ? "5986155e3f918bda1f65c08326d5b497" : "be5fceec2f7d8f098faf5f8cb292654e";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            overflow: hidden; 
            background: transparent; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            width: 100vw;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${key}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <div 
        className="bg-black/20 rounded-xl border border-white/5 overflow-hidden flex justify-center items-center shadow-inner relative"
        style={{ width: isHorizontal ? "100%" : width, maxWidth: width, height }}
      >
        <span className="absolute text-white/20 text-xs font-semibold uppercase tracking-widest z-0 pointer-events-none">
          Publicidad
        </span>
        <iframe
          title={`Advertisement ${type}`}
          srcDoc={html}
          width={width}
          height={height}
          style={{ border: "none", overflow: "hidden", position: "relative", zIndex: 10 }}
          scrolling="no"
        />
      </div>
    </div>
  );
}

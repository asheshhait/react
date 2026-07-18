import yt_dlp

url = "https://youtu.be/DV_NS2vJqd8?si=GrEIrBWBZSMspJ7m"

ydl_opts = {
    'format': 'bestvideo+bestaudio/best',
    'outtmpl': '%(title)s.%(ext)s',
    'merge_output_format': 'mp4',
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download([url])
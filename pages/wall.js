import useSWR from "swr";
import Marquee from "react-marquee-slider";

function chunkUpArray(array, chunkSize) {
  var temporal = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    temporal.push(array.slice(i, i + chunkSize));
  }

  return temporal;
}

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/list", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // render data
  return (
    <div style={{ background: "black" }}>
      {chunkUpArray(data, Math.ceil(data.length / 3)).map((chunk) => (
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Marquee velocity={30 + (5 * Math.random())} direction={'ltr'}>
            {chunk.map((x) => (
              <img
                src={x["Image Data URL"]}
                style={{
                  height: "30vh",
                  objectFit: "cover",
                  objectPosition: "top",
                  marginRight: "40px",
                  borderRadius: '12px'
                }}
              />
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  );
}

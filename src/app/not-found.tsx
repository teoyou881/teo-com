import Link from "next/link";

export default function NotFound() {
  return (
      <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
      >
        <h2>404 Not Found</h2>
        <p>Could not find the requested resource</p>
        <Link
            href="/"
            style={{
              textDecoration: "none",
              backgroundColor: "#0070f3",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
            }}
        >
          Return Home
        </Link>
      </div>
  );
}
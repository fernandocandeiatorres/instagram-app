import React from "react";
import Stories from "./Stories";

export default function Feed() {
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
    xl:grid-cols-3 xl:max-w-6xl mx-auto "
      // Mobile -> 1 col, no minprofile/suggestions
      // Medium -> 2 cols
      // XL -> 3 cols ( the feed is divided by 3 columns)
      // 2 for the stories/posts and 1 for the miniprofile/suggestions
    >
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
      </section>

      <section>
        {/* Mini profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}

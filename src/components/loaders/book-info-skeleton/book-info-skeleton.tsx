import { FC } from "react";

const BookInfoSkeleton:FC = function() {
  return (
    <div
      style={{
        width: "100%",
        height: "145px",
        marginTop: "24px",
        borderRadius: "14px"
      }}
      className="book-info-skeleton skeleton" 
    />
  );
}

export default BookInfoSkeleton;
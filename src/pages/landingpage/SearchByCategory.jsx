import React, { useRef } from "react";
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const categories = [
  "Category One",
  "Category Two",
  "Category Three",
  "Category Four",
  "Category Five",
  "Category Six",
  "Category Seven",
];

const SearchByCategory = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === "left") {
        current.scrollLeft -= 200;
      } else {
        current.scrollLeft += 200;
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Search by Category
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => scroll("left")}>
          {" "}
          <ArrowBackIos />{" "}
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {categories.map((category, index) => (
            <Card key={index} sx={{ minWidth: 150, textAlign: "center", p: 1 }}>
              <CardContent>
                <Box
                  sx={{
                    fontSize: 40,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  🔍
                </Box>
                <Typography variant="body1">{category}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <IconButton onClick={() => scroll("right")}>
          {" "}
          <ArrowForwardIos />{" "}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchByCategory;

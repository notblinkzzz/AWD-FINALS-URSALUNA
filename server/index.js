import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

let users = [];
let platforms = [];
let reviews = [];

// User Account Management
app.post("/api/LanguageLearner/users", (req, res) => {
  const { email, name, password } = req.body;
  const newUser = { id: users.length + 1, email, name, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/api/LanguageLearner/users", (req, res) =>
  res.status(200).json(users)
);

app.get("/api/LanguageLearner/users/login/:email", (req, res) => {
  const user = users.find((u) => u.email === req.params.email);
  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "User not found" });
});

app.put("/api/LanguageLearner/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/api/LanguageLearner/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id == req.params.id);
  userIndex !== -1
    ? (users.splice(userIndex, 1),
      res.status(200).json({ message: "User banned successfully" }))
    : res.status(404).json({ message: "User not found" });
});

// Language Learning Platform Submission & Management
app.post("/api/LanguageLearner/platforms", (req, res) => {
  const { name, website, languagesOffered, description, submittedBy } =
    req.body;
  const newPlatform = {
    id: platforms.length + 1,
    name,
    website,
    languagesOffered,
    description,
    submittedBy,
  };
  platforms.push(newPlatform);
  res.status(201).json(newPlatform);
});

app.get("/api/LanguageLearner/platforms", (req, res) =>
  res.status(200).json(platforms)
);

app.get("/api/LanguageLearner/platforms/:id", (req, res) => {
  const platform = platforms.find((p) => p.id == req.params.id);
  platform
    ? res.status(200).json(platform)
    : res.status(404).json({ message: "Platform not found" });
});

app.put("/api/LanguageLearner/admin/platforms/:id", (req, res) => {
  const platform = platforms.find((p) => p.id == req.params.id);
  if (platform) {
    Object.assign(platform, req.body);
    res.status(200).json(platform);
  } else {
    res.status(404).json({ message: "Platform not found" });
  }
});

app.delete("/api/LanguageLearner/admin/platforms/:id", (req, res) => {
  const platformIndex = platforms.findIndex((p) => p.id == req.params.id);
  platformIndex !== -1
    ? (platforms.splice(platformIndex, 1),
      res.status(200).json({ message: "Platform deleted successfully" }))
    : res.status(404).json({ message: "Platform not found" });
});

// Reviews & Ratings
app.post("/api/LanguageLearner/reviews", (req, res) => {
  const { platformId, userId, rating, comment } = req.body;
  const newReview = {
    id: reviews.length + 1,
    platformId,
    userId,
    rating,
    comment,
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.get("/api/LanguageLearner/reviews", (req, res) => {
  res.status(200).json(reviews);
});

app.put("/api/LanguageLearner/reviews/:reviewId", (req, res) => {
  const review = reviews.find((r) => r.id == req.params.reviewId);
  if (review) {
    Object.assign(review, req.body);
    res.status(200).json(review);
  } else {
    res.status(404).json({ message: "Review not found" });
  }
});

app.delete("/api/LanguageLearner/reviews/:reviewId", (req, res) => {
  const reviewIndex = reviews.findIndex((r) => r.id == req.params.reviewId);
  reviewIndex !== -1
    ? (reviews.splice(reviewIndex, 1),
      res.status(200).json({ message: "Review deleted successfully" }))
    : res.status(404).json({ message: "Review not found" });
});

// Ranking & Sorting
app.get("/api/LanguageLearner/ranking-sorting/leaderboard", (req, res) => {
  const platformsWithMetrics = platforms.map((platform) => {
    const platformReviews = reviews.filter(
      (review) => review.platformId === platform.id.toString()
    );
    const averageRating = platformReviews.length
      ? platformReviews.reduce(
          (sum, review) => sum + parseInt(review.rating),
          0
        ) / platformReviews.length
      : 0;
    const popularity = platformReviews.length;
    return {
      ...platform,
      averageRating,
      popularity,
    };
  });

  const sortedPlatforms = platformsWithMetrics.sort(
    (a, b) => b.averageRating - a.averageRating
  );
  res.status(200).json(sortedPlatforms);
});

app.get("/api/LanguageLearner/ranking-sorting/:orderBy", (req, res) => {
  const { orderBy } = req.params;

  if (orderBy !== "rating" && orderBy !== "popularity") {
    return res.status(400).json({
      message: "Invalid orderBy parameter. Use 'rating' or 'popularity'.",
    });
  }

  const platformsWithMetrics = platforms.map((platform) => {
    const platformReviews = reviews.filter(
      (review) => review.platformId === platform.id.toString()
    );
    const averageRating = platformReviews.length
      ? platformReviews.reduce(
          (sum, review) => sum + parseInt(review.rating),
          0
        ) / platformReviews.length
      : 0;
    const popularity = platformReviews.length;
    return {
      ...platform,
      averageRating,
      popularity,
    };
  });

  const sortedPlatforms = platformsWithMetrics.sort((a, b) => {
    if (orderBy === "rating") {
      return b.averageRating - a.averageRating;
    } else if (orderBy === "popularity") {
      return b.popularity - a.popularity;
    }
  });

  res.status(200).json(sortedPlatforms);
});

// Admin Validation
app.post("/api/LanguageLearner/admin/platforms/:id/validate", (req, res) => {
  const platform = platforms.find((p) => p.id == req.params.id);
  platform
    ? ((platform.validated = true),
      res.status(200).json({ message: "Platform validated successfully" }))
    : res.status(404).json({ message: "Platform not found" });
});

app.post("/api/LanguageLearner/admin/reviews/:id/validate", (req, res) => {
  const review = reviews.find((r) => r.id == req.params.id);
  review
    ? ((review.validated = true),
      res.status(200).json({ message: "Review validated successfully" }))
    : res.status(404).json({ message: "Review not found" });
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

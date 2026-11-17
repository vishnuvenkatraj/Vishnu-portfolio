/**
 * Dedicated Profile Photo Configuration
 * 
 * TO REPLACE YOUR PHOTO LATER:
 * 1. Simply replace the image file at:
 *    public/images/profile/profile-photo.jpg
 * 2. Or update the configuration below if using a different filename or path.
 */

export interface ProfilePhotoConfig {
  url: string;
  alt: string;
  fullName: string;
  role: string;
  department: string;
  location: string;
  badge: string;
  status: string;
  aspectRatio: string;
  originalDimensions: {
    width: number;
    height: number;
  };
}

export const profilePhotoConfig: ProfilePhotoConfig = {
  url: "/images/profile/profile-photo.jpg",
  alt: "Vishnu V - Official Passport Size Profile Photo",
  fullName: "VISHNU V",
  role: "Aspiring Software Developer",
  department: "B.Tech Computer Science & Business Systems",
  location: "Virudhunagar, Tamil Nadu",
  badge: "Official Passport Portrait",
  status: "Verified Developer",
  aspectRatio: "803 / 1024", // Natural passport aspect ratio (approx 3.5:4.5)
  originalDimensions: {
    width: 803,
    height: 1024,
  },
};

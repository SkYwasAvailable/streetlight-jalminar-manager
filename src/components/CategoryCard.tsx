import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

export const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
  return (
    <Link
      to={link}
      className="block w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
    >
      <div className="relative h-40">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
          {title}
        </h3>
      </div>
    </Link>
  );
};
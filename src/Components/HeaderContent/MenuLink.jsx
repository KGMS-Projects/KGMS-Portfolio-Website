import React from 'react';
import { Link } from "react-router-dom"; // ✅ Import Link

export default function MenuLink(props) {
  return (
    <Link to={props.linkurl} className="text-yellow-600 text-medium hover:text-gray-300 transition-all duration-300">
      {props.linktext}
    </Link>
  );
}

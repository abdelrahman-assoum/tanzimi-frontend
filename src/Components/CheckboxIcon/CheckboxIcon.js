import { useContext, useState } from "react";
import styles from "./check.module.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../context/authProvider";
function CheckboxIcon({ variant, taskId, changingStatus }) {
  const {token, userInfo} = useContext(AuthContext)
  const [currentVariant, setCurrentVariant] = useState(variant);
  let svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_214_169" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_214_169)">
                <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z"/>
                </g>
                </svg>`;
  if (currentVariant === "To-do") {
    svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_214_169" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_214_169)">
                <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#333"/>
                </g>
                </svg>`;
  } else if (currentVariant === "In-Progress") {
    svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_214_187" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_214_187)">
                <path d="M7 13H17V11H7V13ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"/>
                </g>
                </svg>
`;
  } else if (currentVariant === "Done") {
    svgCode = `<svg width="24" height="24" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_214_199" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
<rect x="0.611816" y="0.661682" width="24" height="24" />
</mask>
<g mask="url(#mask0_214_199)">
<path d="M11.2118 16.8617L18.2618 9.81168L16.8618 8.41168L11.2118 14.0617L8.36182 11.2117L6.96182 12.6117L11.2118 16.8617ZM5.61182 21.6617C5.06182 21.6617 4.59098 21.4658 4.19932 21.0742C3.80765 20.6825 3.61182 20.2117 3.61182 19.6617V5.66168C3.61182 5.11168 3.80765 4.64085 4.19932 4.24918C4.59098 3.85752 5.06182 3.66168 5.61182 3.66168H19.6118C20.1618 3.66168 20.6327 3.85752 21.0243 4.24918C21.416 4.64085 21.6118 5.11168 21.6118 5.66168V19.6617C21.6118 20.2117 21.416 20.6825 21.0243 21.0742C20.6327 21.4658 20.1618 21.6617 19.6118 21.6617H5.61182Z"/>
</g>
</svg>
`;
  }
  const handleCheckboxClick = () => {
    let updatedVariant;
    if (currentVariant === "To-do") {
      updatedVariant = "In-Progress";
    } else if (currentVariant === "In-Progress") {
      updatedVariant = "Done";
    } else if (currentVariant === "Done") {
      updatedVariant = "Done";
    }

    setCurrentVariant(updatedVariant);
    if (currentVariant === "In-Progress" || currentVariant === "To-do") {
      if (token) {
      axios
        .put(
          `${process.env.REACT_APP_URL}/tasks/edit/${taskId}`,
          { status: updatedVariant },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          changingStatus();
        }).then(()=> {
          toast.success(`Task ${updatedVariant}`, {
            id: Math.random()
          });
        })
        .catch((error) => {
          // Handle error
          console.error(error);
          toast.error("An error occurred.");
        });
      }
    }
  };

  return (
    <>
      {/* <Toaster /> */}
      <div
        className={styles.checkbox}
        onClick={handleCheckboxClick}
        dangerouslySetInnerHTML={{ __html: svgCode }}
        style={{
          cursor: currentVariant !== "Done" ? "pointer" : "default",
        }}
      ></div>
    </>
  );
}

export default CheckboxIcon;

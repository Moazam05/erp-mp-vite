import parse from "html-react-parser";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "../../../contexts/LanguageContext";
import "react-quill/dist/quill.snow.css";

const FooterSections = ({ aboutData }) => {
  const { getDirection } = useTranslation();

  function manipulateHTML(htmlString) {
    // Parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Get the ul element
    const ulElement = doc.querySelector("ul");

    // Remove list style type from ul element
    if (ulElement) {
      ulElement.style.listStyleType = "none";
      ulElement.style.padding = "0";
    }

    // Get the li elements
    const liElements = doc.querySelectorAll("li");

    // Add margin to li elements
    if (liElements) {
      liElements.forEach((li) => {
        li.style.marginBottom = "5px";
      });
    }

    // Get the p elements
    const pElements = doc.querySelectorAll("p");
    if (pElements) {
      pElements.forEach((p) => {
        p.style.marginBottom = "5px";
      });
    }

    // get the h1,h2,h4,h6 elements
    const h1Elements = doc.querySelectorAll("h1");
    const h2Elements = doc.querySelectorAll("h2");
    const h4Elements = doc.querySelectorAll("h4");
    const h6Elements = doc.querySelectorAll("h6");
    if (h1Elements || h2Elements || h4Elements || h6Elements) {
      h1Elements.forEach((h1) => {
        h1.style.marginBottom = "12px";
      });
      h2Elements.forEach((h2) => {
        h2.style.marginBottom = "12px";
      });
      h4Elements.forEach((h4) => {
        h4.style.marginBottom = "12px";
      });
      h6Elements.forEach((h6) => {
        h6.style.marginBottom = "12px";
      });
    }

    // Add inline styles to anchor tags
    const anchorTags = doc.querySelectorAll("a");
    anchorTags.forEach((a) => {
      a.style.color = "#fff"; // Example inline style
      // Add more inline styles as needed
    });

    // Convert the manipulated HTML back to string
    const manipulatedHTMLString = doc.documentElement.outerHTML;

    return manipulatedHTMLString;
  }

  const manipulatedHTML = manipulateHTML(aboutData?.section_one);
  const manipulatedHTML2 = manipulateHTML(aboutData?.section_two);

  const sectionOne = parse(manipulatedHTML, { replace: (domNode) => domNode });
  const sectionTwo = parse(manipulatedHTML2, { replace: (domNode) => domNode });

  return (
    <>
      <Grid
        xs={12}
        lg={2.4}
        md={4}
        item
        dir={getDirection()}
        sx={{ paddingRight: "20px", color: "#fff", marginTop: "8px" }}
      >
        {sectionOne}
      </Grid>

      <Grid xs={12} lg={2.4} md={4} item dir={getDirection()}>
        <Box
          sx={{
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignItems: "start",
            marginTop: "8px",
          }}
        >
          {sectionTwo}
        </Box>
      </Grid>
    </>
  );
};

export default FooterSections;

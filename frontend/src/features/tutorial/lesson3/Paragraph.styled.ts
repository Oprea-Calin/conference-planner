import { fontSize, styled } from "@mui/system";
import theme from "units/theme/variants/default";

const Paragraph = styled("p")(({ theme }) => ({ fontSize: "5rem", lineHeight: 2.2, color: theme.palette.text.secondary }));
export default Paragraph;

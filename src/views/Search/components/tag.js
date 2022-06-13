import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import RectangleRoundedIcon from "@mui/icons-material/RectangleRounded";

export default function Tags() {
  return (
    <Grid container>
      <Box
        sx={{
          mr: "21%",
          ml: { xs: "-7%", sm: "-1.5%" },
          mt: -3,
          mb: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          height: 500,
          width: { xs: "100%", sm: "60%", md: "40%" },
          bgcolor: "white",
        }}
        component={Paper}
        elevation={2}
      >
        <Grid item xs={11.5} sx={{ my: "2%" }}>
          <Box sx={{ border: 0.5, borderRadius: 1 }}>
            <Grid item sx={{ ml: "1%", my: "1%" }}>
              <Typography fontWeight={700}>High</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              sx={{ ml: "1%", mt: "-1%", mb: "1%" }}
            >
              <RectangleRoundedIcon
                sx={{ color: "red", mr: "1%", fontSize: 18 }}
              />
              <Typography fontSize={13.5} color="#6d6d6d">
                0/10 Tasks completed
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

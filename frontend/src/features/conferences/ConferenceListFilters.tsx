import { Grid } from "@mui/material";

const ConferenceListFilters: React.FC<{
  filterText: string;
  onFilterTextChange: (text: string) => void;
}> = ({ filterText, onFilterTextChange }) => {
  return (
    <div>
      <Grid display={"flex"} justifyContent="center" alignItems="center">
        <Grid container spacing={2} size={{ xs: 6, md: 4 }} overflow={"auto"} justifyContent="center">
          <Grid>
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="conferenceName"
              value={filterText}
              onChange={(e) => onFilterTextChange(e.target.value)}
              placeholder="Conference Name"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="location"
              placeholder="Location"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="category"
              placeholder="Category"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConferenceListFilters;

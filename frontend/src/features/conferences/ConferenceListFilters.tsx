import { Grid } from "@mui/material";

const ConferenceListFilters: React.FC<{
  filterText: string;
  onFilterTextChange: (text: string) => void;
  filterStartDate: Date;
  onFilterStartDateChange: (date: Date) => void;
  filterEndDate: Date;
  onFilterEndDateChange: (date: Date) => void;
}> = ({ filterText, onFilterTextChange, filterStartDate, onFilterStartDateChange, filterEndDate, onFilterEndDateChange }) => {
  return (
    <div style={{ position: "sticky", top: 0, backgroundColor: "white", paddingBottom: 8 }}>
      <Grid display={"flex"} justifyContent="center" alignItems="center" padding={0}>
        <Grid container spacing={2} size={{ xs: 6, md: 4 }} overflow={"auto"} justifyContent="center">
          <Grid>
            <input
              type="date"
              name="startDate"
              value={filterStartDate.toLocaleDateString("en-CA")}
              onChange={(e) => {
                onFilterStartDateChange(new Date(e.target.value));
              }}
              placeholder="Start Date"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="date"
              name="endDate"
              value={filterEndDate.toLocaleDateString("en-CA")}
              onChange={(e) => {
                onFilterEndDateChange(new Date(e.target.value));
              }}
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

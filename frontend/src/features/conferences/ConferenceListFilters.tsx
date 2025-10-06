import { Grid } from "@mui/material";

const ConferenceListFilters: React.FC<{
  filterText: string;
  onFilterTextChange: (text: string) => void;
  filterStartDate: Date | null;
  onFilterStartDateChange: (date: Date | null) => void;
  filterEndDate: Date | null;
  onFilterEndDateChange: (date: Date | null) => void;
  filterConferenceTypeName: string;
  onFilterConferenceTypeNameChange: (conferenceTypeName: string) => void;
  filterCity: string;
  onFilterCityChange: (city: string) => void;
  filterCountry: string;
  onFilterCountryChange: (country: string) => void;
  filterCounty: string;
  onFilterCountyChange: (county: string) => void;
}> = ({
  filterText,
  onFilterTextChange,
  filterStartDate,
  onFilterStartDateChange,
  filterEndDate,
  onFilterEndDateChange,
  filterConferenceTypeName,
  onFilterConferenceTypeNameChange,
  filterCity,
  onFilterCityChange,
  filterCountry,
  onFilterCountryChange,
  filterCounty,
  onFilterCountyChange
}) => {
  return (
    <div style={{ zIndex: "10", position: "sticky", top: 0, backgroundColor: "white", paddingBottom: 8 }}>
      <Grid display={"flex"} justifyContent="center" alignItems="center" padding={0}>
        <Grid container spacing={2} size={{ xs: 6, md: 4 }} overflow={"auto"} justifyContent="center">
          <Grid>
            <input
              type="date"
              name="startDate"
              value={filterStartDate ? filterStartDate.toLocaleDateString("en-CA") : ""}
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
              value={filterEndDate ? filterEndDate.toLocaleDateString("en-CA") : ""}
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
              name="city"
              value={filterCity}
              onChange={(e) => onFilterCityChange(e.target.value)}
              placeholder="city"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="county"
              value={filterCounty}
              onChange={(e) => onFilterCountyChange(e.target.value)}
              placeholder="county"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="country"
              value={filterCountry}
              onChange={(e) => onFilterCountryChange(e.target.value)}
              placeholder="country"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="Type"
              value={filterConferenceTypeName}
              onChange={(e) => onFilterConferenceTypeNameChange(e.target.value)}
              placeholder="Type"
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

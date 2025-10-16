import { BorderAll } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { useApiSWR } from "units/swr";
import { endpoints, toast } from "utils";

const ConferenceListFilters: React.FC<{
  filterText: string;
  onFilterTextChange: (text: string) => void;
  filterStartDate: Date | undefined;
  onFilterStartDateChange: (date: Date | undefined) => void;
  filterEndDate: Date | undefined;
  onFilterEndDateChange: (date: Date | undefined) => void;
  filterConferenceTypeName: string;
  onFilterConferenceTypeNameChange: (conferenceTypeName: string) => void;
  filterCity: string;
  onFilterCityChange: (city: string) => void;
  filterCountry: string;
  onFilterCountryChange: (country: string) => void;
  filterCounty: string;
  onFilterCountyChange: (county: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  timeFilter: string;
  onTimeFilterChange: (time: string) => void;
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
  onFilterCountyChange,
  statusFilter,
  onStatusFilterChange,
  timeFilter,
  onTimeFilterChange
}) => {
  const { data: conferenceCities = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.cities, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCounties = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.counties, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCountries = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.countries, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceTypes = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.conferenceTypes, {
    onError: (err) => toast.error(t("Error loading conference types: ", { message: err.message }))
  });
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        Filters
      </Button> */}
      <Button
        variant="contained"
        disableRipple
        onClick={() => setOpen(true)}
        sx={{
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          position: "fixed",
          right: 40,
          top: 110,
          zIndex: 1000,
          padding: "10px 20px",
          borderRadius: 8,
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(25, 118, 210, 0.2)",
          transition: "ease-in",
          fontSize: "16px",
          "&:hover": {
            background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
            boxShadow: "0 2px 6px rgba(21, 101, 192, 0.5)"
          }
        }}
      >
        Filters
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>Filters</DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Status
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {["Joined", "Withdrawn", "Attended"].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "contained" : "outlined"}
                    onClick={() => onStatusFilterChange(statusFilter === status ? "" : status)}
                  >
                    {status}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Time
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {["Upcoming", "Ended"].map((time) => (
                  <Button
                    key={time}
                    variant={timeFilter === time ? "contained" : "outlined"}
                    onClick={() => onTimeFilterChange(timeFilter === time ? "" : time)}
                  >
                    {time}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 1
            }}
          >
            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                Conference Name
              </Typography>
              <TextField fullWidth type="text" value={filterText} onChange={(e) => onFilterTextChange(e.target.value)} size="small" />
            </Box>

            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                StartDate
              </Typography>
              <input
                type="date"
                name="startDate"
                value={filterStartDate ? filterStartDate.toLocaleDateString("en-CA") : ""}
                onChange={(e) => onFilterStartDateChange(new Date(e.target.value))}
                placeholder="Start Date"
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                EndDate
              </Typography>
              <input
                type="date"
                name="endDate"
                value={filterEndDate ? filterEndDate.toLocaleDateString("en-CA") : ""}
                onChange={(e) => onFilterEndDateChange(new Date(e.target.value))}
                placeholder="End Date"
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </Box>

            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                City
              </Typography>
              <TextField select fullWidth value={filterCity} onChange={(e) => onFilterCityChange(e.target.value)} size="small">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {conferenceCities.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                County
              </Typography>
              <TextField select fullWidth value={filterCounty} onChange={(e) => onFilterCountyChange(e.target.value)} size="small">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {conferenceCounties.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                Country
              </Typography>
              <TextField select fullWidth value={filterCountry} onChange={(e) => onFilterCountryChange(e.target.value)} size="small">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {conferenceCountries.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ flex: "1 1 220px", minWidth: 220 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.7, color: "text.secondary", fontWeight: 600 }}>
                Type
              </Typography>
              <TextField
                select
                fullWidth
                value={filterConferenceTypeName}
                onChange={(e) => onFilterConferenceTypeNameChange(e.target.value)}
                size="small"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {conferenceTypes.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary" size="large" fullWidth>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConferenceListFilters;

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
              <TextField select fullWidth value={filterCity} onChange={(e) => onFilterCityChange(e.target.value)} size="small" displayEmpty>
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

  // return (
  //   <>
  //     <div style={{ padding: 16, textAlign: "right" }}>
  //       <Button variant="outlined" onClick={() => setOpen(true)}>
  //         Filters
  //       </Button>
  //     </div>

  //     <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
  //       <DialogTitle>Filters</DialogTitle>
  //       <DialogContent>
  //         <Grid container spacing={2}>
  //           <Grid>
  //             <input
  //               type="date"
  //               name="startDate"
  //               value={filterStartDate ? filterStartDate.toLocaleDateString("en-CA") : ""}
  //               onChange={(e) => onFilterStartDateChange(new Date(e.target.value))}
  //               placeholder="Start Date"
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //             />
  //           </Grid>
  //           <Grid>
  //             <input
  //               type="date"
  //               name="endDate"
  //               value={filterEndDate ? filterEndDate.toLocaleDateString("en-CA") : ""}
  //               onChange={(e) => onFilterEndDateChange(new Date(e.target.value))}
  //               placeholder="End Date"
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //             />
  //           </Grid>
  //           <Grid>
  //             <input
  //               type="text"
  //               name="conferenceName"
  //               value={filterText}
  //               onChange={(e) => onFilterTextChange(e.target.value)}
  //               placeholder="Name"
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //             />
  //           </Grid>
  //           <Grid>
  //             <select
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //               value={filterCity}
  //               onChange={(e) => onFilterCityChange(e.target.value)}
  //             >
  //               <option value="">{t("City")}</option>
  //               {conferenceCities.map((c) => (
  //                 <option key={c.id} value={c.name}>
  //                   {c.name}
  //                 </option>
  //               ))}
  //             </select>
  //           </Grid>
  //           <Grid>
  //             <select
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //               value={filterCounty}
  //               onChange={(e) => onFilterCountyChange(e.target.value)}
  //             >
  //               <option value="">{t("County")}</option>
  //               {conferenceCounties.map((c) => (
  //                 <option key={c.id} value={c.name}>
  //                   {c.name}
  //                 </option>
  //               ))}
  //             </select>
  //           </Grid>
  //           <Grid>
  //             <select
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //               value={filterCountry}
  //               onChange={(e) => onFilterCountryChange(e.target.value)}
  //             >
  //               <option value="">{t("Country")}</option>
  //               {conferenceCountries.map((c) => (
  //                 <option key={c.id} value={c.name}>
  //                   {c.name}
  //                 </option>
  //               ))}
  //             </select>
  //           </Grid>
  //           <Grid>
  //             <select
  //               style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
  //               value={filterConferenceTypeName}
  //               onChange={(e) => onFilterConferenceTypeNameChange(e.target.value)}
  //             >
  //               <option value="">{t("Type")}</option>
  //               {conferenceTypes.map((c) => (
  //                 <option key={c.id} value={c.name}>
  //                   {c.name}
  //                 </option>
  //               ))}
  //             </select>
  //           </Grid>
  //         </Grid>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setOpen(false)} variant="contained" color="primary">
  //           Apply
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </>
  // );
};

export default ConferenceListFilters;

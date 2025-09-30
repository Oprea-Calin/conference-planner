using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Entities.Conference;
using Charisma.Common.Domain.Entities.Dictionaries;
using Charisma.Common.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Infrastructure.Persistence.Repositories
{
    public class ConferenceRepository(CharismaDbContext dbContext, ILogger<ConferenceRepository> logger) : IConferenceRepository
    {
        public async Task<List<Location>> GetLocation()
        {
            var categ = new List<Location>();
            categ = await dbContext.Locations
                .Include(x => x.City)
                .Include(x => x.Country)
                .Include(x => x.County)
                .ToListAsync();

            return await Task.FromResult(categ);
        }
        public async Task<List<Conference>> GetAllConferences()
        {
            var categ = new List<Conference>();
            categ = await dbContext.Conferences
                .Include(x => x.conferenceType)
                .Include(x => x.location)
                .Include(x => x.category)
                .Include(x => x.location.Country)
                .Include(x => x.location.County)
                .Include(x => x.location.City)
                .ToListAsync();

            return await Task.FromResult(categ);
        }

        public async Task<Conference> GetConferenceById(int id)
        {
            var categ = new Conference();
            categ = await dbContext.Conferences
                .Include(x => x.conferenceType)
                .Include(x => x.location)
                .ThenInclude(x => x.Country)
                .Include(x => x.location)
                .ThenInclude(x => x.County)
                .Include(x => x.location)
                .ThenInclude(x => x.City)
                .Include(x => x.category)
                .FirstOrDefaultAsync(x => x.Id == id);

            return await Task.FromResult(categ);
        }


        public async Task<Conference> GetConfercesFiltered(int id)
        {
            var categ = new Conference();
            categ = await dbContext.Conferences
                .Include(x => x.conferenceType)
                .Include(x => x.location)
                .ThenInclude(x => x.Country)
                .Include(x => x.location)
                .ThenInclude(x => x.County)
                .Include(x => x.location)
                .ThenInclude(x => x.City)
                .Include(x => x.category)
                .FirstOrDefaultAsync(x => x.Id == id);

            return await Task.FromResult(categ);
        }

        public void DeleteConference(Conference conference)
        {
            dbContext.Conferences.Remove(conference);
        }

        public void AddConference(Conference conference)
        {
            dbContext.Conferences.Add(conference);
        }

        public async Task Save()
        {
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<Speaker>> getAllSpeakers()
        {
            var speakers = new List<Speaker>();
            speakers = await dbContext.Speakers.ToListAsync();
            return speakers;
        }

        public void AddSpeaker(ConferenceXSpeaker speaker)
        {
             dbContext.ConferenceXSpeakers.AddAsync(speaker);
        }




        }
}

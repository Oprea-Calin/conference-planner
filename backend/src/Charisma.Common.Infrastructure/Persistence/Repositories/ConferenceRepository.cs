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

    }
    
}

using Charisma.Common.Domain.Entities.Conference;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Abstractions
{
    public interface IConferenceRepository
    {
        public Task<List<Location>> GetLocation();
        public Task<List<Conference>> GetAllConferences();
        public Task<Conference> GetConferenceById(int id);

    }
}

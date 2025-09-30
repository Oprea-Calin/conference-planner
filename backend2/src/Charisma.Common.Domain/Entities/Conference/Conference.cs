using Charisma.Common.Domain.Entities.Dictionaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Entities.Conference
{
    public class Conference
    {
        public int Id { get; set; }
        public int ConferenceTypeId { get; set; }
        public int LocationId { get; set; }
        public string OrganizerEmail { get; set; }
        public int CategoryId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Name { get; set; }

        public DictionaryConferenceType conferenceType { get; set; }

        public Location location { get; set; }
        public DictionaryCategory category { get; set; }
        //public List<Speaker> speakers { get; set; }
        public List<ConferenceXSpeaker> ConferenceXSpeakers { get; set; }

    }
}

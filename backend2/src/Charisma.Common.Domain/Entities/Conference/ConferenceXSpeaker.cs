using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Entities.Conference
{
    public class ConferenceXSpeaker
    {
        public int Id { get; set; }
        public int ConferenceId { get; set; }
        public int SpeakerId { get; set; }
        public bool IsMainSpeaker { get; set; }

        public Conference Conference { get; set; }
        public Speaker Speaker { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Dtos
{
    public class ConferenceXSpeakerDTO
    {
        public int Id { get; set; }
        public int ConferenceId { get; set; }
        public int SpeakerId { get; set; }
        public bool IsMainSpeaker { get; set; }
        public SpeakerDTO Speaker { get; set; }

        public ConferenceDTO Conference { get; set; }
    }
}

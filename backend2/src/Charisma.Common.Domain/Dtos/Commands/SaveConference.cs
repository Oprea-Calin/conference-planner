using MediatR;
using NBB.Messaging.DataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Dtos.Commands
{
    //[TopicName("Charisma.Commands.SaveConference")]
    //public record SaveConference(ConferenceDTO Conference) : IRequest;

    [TopicName("Charisma.Commands.SaveConference")]
    public record SaveConference() : IRequest {

        public int Id { get; init; }
        public int ConferenceTypeId { get; init; }
        public int LocationId { get; init; }   
        public LocationDTO Location { get; init; }
        public string OrganizerEmail { get; init; }

        public int CategoryId { get; init; }

        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public string Name { get; init; }
        public List<Speaker> Speakers { get; init; }

        public record Speaker
        {
            public int ConferenceSpeakerId { get; init; }
            public int SpeakerId { get; init; }
            public string Name { get; init; }
            public string Nationality { get; init; }
            public int Rating { get; init; }
            public bool IsMainSpeaker { get; init; }
        }


    };



}

using MediatR;
using NBB.Messaging.DataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Dtos.Commands.Conferences
{
    [TopicName("Charisma.Commands.Conferences.SaveFeedback")]
    public class SaveFeedback : IRequest
    {
        public int Id { get; set; }
        public string AttendeeEmail { get; set; }
        public int ConferenceId { get; set; }
        public int SpeakerId { get; set; }
        public decimal? Rating { get; set; }
        public string? Message { get; set; }
        public Speaker Speaker { get; set; }
    }
  
}

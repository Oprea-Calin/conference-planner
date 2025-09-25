using MediatR;
using NBB.Messaging.DataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Dtos.Commands
{
    [TopicName("Charisma.Commands.SaveConference")]
    public record SaveConference(ConferenceDTO Conference) : IRequest;
    
    
}

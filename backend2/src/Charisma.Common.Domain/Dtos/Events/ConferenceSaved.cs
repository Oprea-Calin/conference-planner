using MediatR;
using NBB.Messaging.DataContracts;

namespace Charisma.Common.Domain.Dtos.Events
{
    [TopicName("Charisma.Events.ConferenceSaved")]
    public record ConferenceSaved(int ConferenceId) : INotification;
}

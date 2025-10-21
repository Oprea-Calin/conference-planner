using MediatR;
using NBB.Messaging.DataContracts;
using System;
using System.Collections.Generic;

namespace Charisma.Common.Domain.Dtos.Events.Conferences
{
    [TopicName("Charisma.Events.Conferences.FeedbackSent")]
    public record FeedbackSent : INotification;
}
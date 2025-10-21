using Charisma.Common.Domain.Entities.Conferences;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Infrastructure.Persistence.Configurations.Conferences
{
    public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
    {
        public void Configure(EntityTypeBuilder<Feedback> builder)
        {
            builder.ToTable("Feedback");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.AttendeeEmail).IsRequired();
            builder.Property(x => x.ConferenceId).IsRequired();
            builder.Property(x => x.Rating).IsRequired();
            builder.Property(x => x.Message).IsRequired();




            builder.HasOne(x => x.Conference)
                .WithMany(x => x.Feedbacks)
                .HasForeignKey(x => x.ConferenceId);

        }
    }
}

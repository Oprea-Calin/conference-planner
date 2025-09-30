using Charisma.Common.Domain.Entities.Conference;
using Charisma.Common.Domain.Entities.Dictionaries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Infrastructure.Persistence.Configurations
{
    public class LocationConfiguration : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            builder.ToTable("Location");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Name).HasMaxLength(200);
            builder.HasOne(x => x.Country).WithMany().HasForeignKey(x => x.CountryId);
            builder.HasOne(x => x.County).WithMany().HasForeignKey(x => x.CountyId);
            builder.HasOne(x => x.City).WithMany().HasForeignKey(x => x.CityId);


        }

    }
}

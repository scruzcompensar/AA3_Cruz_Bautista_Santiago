using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace UCompensarAPI.DataAccess.Data;

public partial class TupatinetaContext : DbContext
{
    public TupatinetaContext()
    {
    }

    public TupatinetaContext(DbContextOptions<TupatinetaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Servicio> Servicios { get; set; }

    public virtual DbSet<TipoServicio> TipoServicios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Servicio>(entity =>
        {
            entity.HasKey(e => e.IdServicio).HasName("PK__servicio__6FD07FDC64E5EAFA");

            entity.ToTable("servicio");

            entity.Property(e => e.IdServicio).HasColumnName("id_servicio");
            entity.Property(e => e.Estado)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaFin)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("fecha_fin");
            entity.Property(e => e.FechaInicio)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("fecha_inicio");
            entity.Property(e => e.IdTipoServicio).HasColumnName("id_tipo_servicio");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.TarifaFin).HasColumnName("tarifa_fin");

            entity.HasOne(d => d.IdTipoServicioNavigation).WithMany(p => p.Servicios)
                .HasForeignKey(d => d.IdTipoServicio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__servicio__id_tip__3E52440B");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Servicios)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__servicio__id_usu__3F466844");
        });

        modelBuilder.Entity<TipoServicio>(entity =>
        {
            entity.HasKey(e => e.IdTipoServicio).HasName("PK__tipo_ser__4227AB8EDD5C4ECE");

            entity.ToTable("tipo_servicio");

            entity.HasIndex(e => e.IdTipoServicio, "UQ__tipo_ser__4227AB8F2AB6F538").IsUnique();

            entity.Property(e => e.IdTipoServicio)
                .ValueGeneratedNever()
                .HasColumnName("id_tipo_servicio");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.NombreServicio)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("nombre_servicio");
            entity.Property(e => e.TarifaBase).HasColumnName("tarifa_base");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__usuario__4E3E04ADF9996006");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.IdUsuario, "UQ__usuario__4E3E04ACDB2700DA").IsUnique();

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.ApellidosUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("apellidos_usuario");
            entity.Property(e => e.ContraseñaUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("contraseña_usuario");
            entity.Property(e => e.CorreoUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("correo_usuario");
            entity.Property(e => e.DireccionUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("direccion_usuario");
            entity.Property(e => e.IdentificacionUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("identificacion_usuario");
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("nombre_usuario");
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("usuario")
                .HasColumnName("role");
            entity.Property(e => e.TelefonoUsuario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("telefono_usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

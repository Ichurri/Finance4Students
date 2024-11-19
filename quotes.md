## CREAR CATEGORIA:

Como: estudiante

Quiero: poder crear categorías personalizadas para mis gastos

Para: organizar mejor mis registros financieros y facilitar el seguimiento de mis gastos según mis necesidades específicas

Criterios de confirmación:

• Cuando el usuario ingresa un nombre para la nueva categoría y presiona “Guardar”, esta debe aparecer en la lista de categorías disponibles.

• Si el usuario intenta guardar una categoría sin nombre o con un nombre duplicado, el sistema debe mostrar un mensaje indicando el error y prevenir la creación hasta que se resuelva.


## ASIGNAR GASTOS A CATEGORIAS:

Como: estudiante

Quiero: poder asignar cada gasto a una categoría

Para: visualizar y analizar mis gastos por categorías y mejorar mi planificación financiera

Criterios de confirmación:

• Al registrar o editar un gasto, el usuario debe tener la opción de seleccionar una categoría de una lista desplegable.

• Si el gasto se guarda con una categoría seleccionada, este debe aparecer correctamente clasificado al visualizar los gastos por 
categoría.

• Si no se selecciona una categoría, el sistema debe asignar automáticamente una categoría predeterminada o mostrar un mensaje indicando que la categoría es obligatoria.


## EDITAR OBJETIVO DE AHORRO:

Como usuario, quiero poder editar los detalles de un objetivo de ahorro existente, para ajustar la descripción o la cantidad objetivo 
en caso de cambios en mis metas financieras.

Criterios de Aceptación

Actualizar la Descripción:

El usuario puede modificar la descripción del objetivo de ahorro.

Los cambios se reflejan inmediatamente en la interfaz y en el almacenamiento.

Actualizar la Cantidad Objetivo:

El usuario puede modificar el monto del objetivo de ahorro.

El nuevo monto debe reemplazar al anterior y actualizarse en el almacenamiento.

Validaciones:

La cantidad objetivo debe ser un número positivo.

Los campos no pueden quedar vacíos al guardar.

Confirmación de Cambios:

El sistema debe mostrar un mensaje de éxito al guardar los cambios.

Persistencia:

Los cambios realizados deben mantenerse guardados incluso después de recargar la página (mediante localStorage).


## EDITAR GASTOS:

Como: estudiante

Quiero: poder editar un gasto registrado previamente

Para: corregir cualquier error o actualizar los detalles del gasto si cambian

Criterios de confirmación:

Si el usuario edita algún detalle del gasto (por ejemplo, el monto o la categoría) y guarda, el cambio debe reflejarse inmediatamente en la lista de registros de gastos.

Si el usuario deja un campo obligatorio en blanco al editar, el sistema debe mostrar un mensaje que indique claramente qué campo necesita ser completado antes de guardar.

## ELIMINAR GASTOS:

Como: usuario de la aplicación

Quiero: eliminar un gasto de mi cuenta

Para: mantener el registro de mis gastos correcto

Criterios de confirmación:

El sistema debe permitir al usuario seleccionar y confirmar la eliminación de un gasto específico.

Antes de eliminar el gasto, el sistema debe mostrar un mensaje de confirmación para evitar eliminaciones accidentales.

Una vez eliminado el gasto, debe actualizarse automáticamente la lista de pagos y el saldo si se ve afectado.


## EDITAR INGRESOS:

Como: estudiante

Quiero: poder editar un ingreso registrado previamente

Para: asegurarme de que los detalles de mis ingresos sean precisos

Criterios de confirmación:

Si el usuario actualiza algún detalle del ingreso (por ejemplo, el monto o descripción) y guarda, el cambio debe reflejarse inmediatamente en la lista de registros de ingresos. 

## ELIMINAR INGRESOS:

Como: estudiante

Quiero: eliminar un ingreso de mi cuenta

Para: corregir mi registro de ingresos

Criterios de confirmación:

Si el usuario selecciona un ingreso específico y confirma la eliminación, el ingreso debe desaparecer inmediatamente de la lista de registros.

El sistema debe mostrar un mensaje de confirmación antes de proceder con la eliminación del ingreso.

Al eliminar un ingreso, el saldo total del usuario si fue afectado debe actualizarse de inmediato.


## VISUALIZAR REPORTES POR CATEGORIA

Como usuario, quiero ver un desglose de mis gastos e ingresos agrupados por categoría, para entender mejor cómo estoy distribuyendo mis recursos y tomar decisiones financieras más informadas.

Criterios de Aceptación

Visualización Agrupada:

El usuario puede ver los gastos e ingresos organizados por cada categoría en un formato claro (tabla o gráfico).

Filtros Opcionales:

El usuario puede aplicar filtros por rango de fechas para ver reportes específicos de un período determinado.

Estadísticas:

Mostrar totales por categoría, tanto de gastos como de ingresos.

Mostrar el porcentaje que representa cada categoría dentro del total general.

Opciones de Presentación:

El usuario puede elegir entre un gráfico de barras, pastel o una tabla para visualizar los datos.

Persistencia:

El desglose debe basarse en los datos almacenados en localStorage.

Accesibilidad:

El sistema debe ser intuitivo y fácil de entender, con etiquetas claras en los gráficos/tablas.


# Planificación del Sprint

1. Asignar Gastos a Categorías (día 3-4): Permitir al usuario seleccionar una categoría al registrar gastos.

2. Editar Objetivo de Ahorro (día 5): Agregar la funcionalidad de edición para ajustar descripción y cantidad objetivo.

3. Editar y Eliminar Gastos (día 6-7): Permitir corregir y eliminar registros de gastos.

4. Editar y Eliminar Ingresos (día 8-9): Hacer lo mismo para los ingresos.

5. Visualizar Reportes por Categoría (día 10-12): Implementar gráficos/tablas y los filtros por rango de fechas.
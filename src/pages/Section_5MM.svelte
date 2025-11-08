<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="5-Minuten-Meeting" gradient="from-fuchsia-400 to-pink-600">
  <div class="grid sm:grid-cols-2 gap-4 text-sm">
    <div>
      <h3 class="font-medium mb-2">Agenda</h3>
      <ul class="list-disc ml-5 space-y-1">
        <li>S – Safety Abweichungen</li>
        <li>Q – Qualität / FPY</li>
        <li>D – Lieferung / OTIF / Takt</li>
        <li>C – Abweichungen / Ideen</li>
      </ul>
    </div>
    <div>
      <h3 class="font-medium mb-2">Teilnehmer / Notizen</h3>
      <div class="h-40 border rounded-lg"></div>
    </div>
  </div>
</PrintBase>

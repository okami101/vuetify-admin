<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Yaml\Yaml;

class CrudGeneratorCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'crud:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate all necessary server-side resources from YML file descriptor';

    /**
     * The filesystem instance.
     *
     * @var \Illuminate\Filesystem\Filesystem
     */
    protected $files;

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type;

    /**
     * Create a new controller creator command instance.
     *
     * @param  \Illuminate\Filesystem\Filesystem  $files
     * @return void
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $dir = $this->argument('path');

        /**
         * Parse all yaml files
         */
        foreach ($this->files->files($dir) as $file) {
            $descriptor = Yaml::parseFile($file);

            foreach ($descriptor as $resource) {
                $this->call('make:crud', [
                    'name' => $resource['model'],
                    '--fields' => $this->getFields($resource),
                    '--translatable' => $this->getFieldNames($resource, 'translatable'),
                    '--searchable' => $this->getFieldNames($resource, 'searchable'),
                    '--sortable' => $this->getFieldNames($resource, 'sortable'),
                    '--mediable' => $this->getMediableFields($resource),
                    '--force' => $this->option('force'),
                    '--migration' => $this->option('migration'),
                    '--factory' => $this->option('factory'),
                    '--seed' => $this->option('seed'),
                ]);
            }
        }
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['path', InputArgument::OPTIONAL, 'The directory which contains YML descriptors', base_path('generators')],
        ];
    }

    private function getFields($resource)
    {
        return collect($resource['fields'])->filter(function ($field) {
            $type = $field['type'] ?? 'string';
            return !in_array($type, ['file', 'image']);
        })->map(function ($field, $name) {
            $type = $field['type'] ?? 'string';
            return "$name:$type";
        })->values();
    }

    private function getFieldNames($resource, $filter = null)
    {
        return collect($resource['fields'])->filter(function ($field) use ($filter) {
            if ($filter) {
                return $field[$filter] ?? false;
            }
            return true;
        })->keys();
    }

    private function getMediableFields($resource)
    {
        return collect($resource['fields'])->filter(function ($field) {
            $type = $field['type'] ?? 'string';
            return in_array($type, ['file', 'image']);
        })->map(function ($field, $name) {
            $multiple = $field['multiple'] ?? false;
            return "$name:$multiple";
        })->values();
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['migration', 'm', InputOption::VALUE_NONE, 'Create a new migration file for the model'],
            ['factory', 'f', InputOption::VALUE_NONE, 'Create a new factory for the model'],
            ['seed', 's', InputOption::VALUE_NONE, 'Create a new seeder file for the model'],
            ['force', null, InputOption::VALUE_NONE, 'Create the class even if the model already exists'],
        ];
    }
}
